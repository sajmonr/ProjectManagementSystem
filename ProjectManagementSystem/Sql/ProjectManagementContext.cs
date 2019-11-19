using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using MySql.Data.MySqlClient;
using ProjectManagementSystem.Sql.Attributes;
using ProjectManagementSystem.Utils;

namespace ProjectManagementSystem.Sql
{
    public class ProjectManagementContext
    {
        private readonly string _connectionString;
        private static string INSERT_STRING_FORMATTING = "`{0}`,";
        private static string UPDATE_STRING_FORMATTING = "`{0}`=@{1},";

        public ProjectManagementContext(): this(Constants.CONNECTION_STRING){}
        
        public ProjectManagementContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConnection() => new MySqlConnection(_connectionString);

        public IEnumerable<T> Select<T>() where T : Table, new()
        {
            var output = new List<T>();
            var properties = typeof(T).GetProperties();
            var tableName = GetTableName<T>();
            using (var connection = GetConnection())
            {
                var command = new MySqlCommand($"select * from {tableName}", connection);
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var newT = new T();
                        foreach (var property in properties)
                        {
                            int index = reader.GetOrdinal(ToCamelCase(property.Name));
                            
                            property.SetValue(newT, reader.IsDBNull(index) ? null : reader[index]);
                        }
                            
                        
                        output.Add(newT);
                    }
                }
            }

            return output;
        }
        
        public IEnumerable<T> SelectWhere<T>(string conditionField, int conditionValue) where T : Table, new()
        {
            var output = new List<T>();
            var properties = typeof(T).GetProperties();
            var tableName = GetTableName<T>();
            using (var connection = GetConnection())
            {
                var command = new MySqlCommand($"select * from {tableName} where {ToCamelCase(conditionField)} = {conditionValue}", connection);
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var newT = new T();
                        foreach (var property in properties)
                        {
                            int index = reader.GetOrdinal(ToCamelCase(property.Name));
                            
                            property.SetValue(newT, reader.IsDBNull(index) ? null : reader[index]);
                        }
                            
                        
                        output.Add(newT);
                    }
                }
            }

            return output;
        }

        public void Delete<T>(string conditionField, object conditionValue) where T : Table
        {
            string tableName = GetTableName<T>();

            using (var connection = GetConnection())
            {
                var command = new MySqlCommand($"delete from {tableName} where {ToCamelCase(conditionField)} = @conditionValue", connection);

                command.Parameters.AddWithValue("@conditionValue", conditionValue);
                
                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void Delete<T>(object primaryKeyValue) where T : Table
        {
            string tableName = GetTableName<T>();
            var primaryKey = typeof(T).GetProperties().FirstOrDefault(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));

            if (primaryKey == null)
                return;

            Delete<T>(primaryKey.Name, primaryKeyValue);
        }

        public void Delete<T>(T value) where T : Table
        {
            var primaryKey = typeof(T).GetProperties().FirstOrDefault(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));

            if (primaryKey != null)
                Delete<T>(primaryKey.GetValue(value));
        }

        public void Delete<T>(IEnumerable<T> values) where T : Table
        {
            foreach(T value in values)
                Delete(value);
        }
        public int Insert<T>(T value) where T : Table
        {
            int insertId = 0;
            var command = CreateInsertCommand(value);

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();

                insertId = LastInsertedId(connection);
            }

            return insertId;
        }

        public void Update<T>(T value) where T : Table
        {
            var command = CreateUpdateCommand(value);

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void Update<T>(T value, string field) where T : Table
        {
            string tableName = GetTableName<T>();
            var primaryKeyProperty = typeof(T).GetProperties()
                .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));
            var newValueProperty = typeof(T).GetProperties()
                .First(p => p.Name.Equals(field, StringComparison.OrdinalIgnoreCase));
            var command = new MySqlCommand($"update {tableName} set {ToCamelCase(field)} = @newValue where {ToCamelCase(primaryKeyProperty.Name)} = @primaryKeyValue");

            command.Parameters.AddWithValue("@newValue", newValueProperty.GetValue(value));
            command.Parameters.AddWithValue("@primaryKeyValue", primaryKeyProperty.GetValue(value));

            using (var connection = GetConnection())
            {
                command.Connection = connection;
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
        
        private string ToCamelCase(string value) => char.ToLowerInvariant(value[0]) + value.Substring(1);

        private MySqlCommand CreateInsertCommand<T>(T value)
        {
            var command = new MySqlCommand();
            string fieldNames = string.Empty;
            string fieldValues = string.Empty;
            

            var properties = typeof(T).GetProperties().Where(x => !Attribute.IsDefined(x, typeof(PrimaryKeyAttribute))).Select(x => x);

            foreach(var property in properties)
            {
                fieldNames += string.Format(INSERT_STRING_FORMATTING, ToCamelCase(property.Name));
                fieldValues += $"@{property.Name},";
                
                command.Parameters.AddWithValue($"@{property.Name}", property.GetValue(value));
            }

            fieldNames = $"{fieldNames.TrimEnd(',')}";
            fieldValues = $"{fieldValues.TrimEnd(',')}";

            command.CommandText = $"insert into {GetTableName<T>()} ({fieldNames}) values({fieldValues})";
            
            return command;
        }
        
        private MySqlCommand CreateUpdateCommand<T>(T value)
        {
            var command = new MySqlCommand();
            string fieldUpdates = string.Empty;

            var properties = typeof(T).GetProperties().Where(x => !Attribute.IsDefined(x, typeof(PrimaryKeyAttribute))).Select(x => x);

            foreach(var property in properties)
            {
                fieldUpdates += String.Format(UPDATE_STRING_FORMATTING, ToCamelCase(property.Name), property.Name);
                command.Parameters.AddWithValue($"@{property.Name}", property.GetValue(value));
            }

            fieldUpdates = fieldUpdates.TrimEnd(',');
            
            //Get the primary key to update against
            var xx = typeof(T).GetProperties();
            var primaryKeyProperty = typeof(T).GetProperties()
                .First(p => Attribute.IsDefined(p, typeof(PrimaryKeyAttribute)));

            command.Parameters.AddWithValue($"@{primaryKeyProperty.Name}", primaryKeyProperty.GetValue(value));
            
            command.CommandText = $"update {GetTableName<T>()} set {fieldUpdates} where {ToCamelCase(primaryKeyProperty.Name)}=@{primaryKeyProperty.Name}";
            
            return command;
        }
        
        private string GetTableName<T>() => GetTableName(typeof(T));
        private string GetTableName(Type tableType) =>
            ((TableAttribute)tableType.GetCustomAttributes(typeof(TableAttribute), inherit: false).Single()).Name;

        private int LastInsertedId(MySqlConnection connection)
        {
            var command = new MySqlCommand("select last_insert_id()", connection);
            return Convert.ToInt32(command.ExecuteScalar());
        }
    }
}