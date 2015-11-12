using Dapper;
using Notes.Auth.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Notes.Auth.Models
{
    public class AuthRepository : IDisposable
    {
        // For work as "dbContext" need: install-package Dapper.Data
        readonly private IDbConnection _db;
        readonly private string _connectionString = ConfigurationManager.ConnectionStrings["NotePad"].ConnectionString;

        public AuthRepository()
        {
            _db = new SqlConnection(_connectionString);
        }
        
        public User FindByLogin(string login)
        {
            User user = null;
            user = _db.Query<User>("SELECT * FROM users WHERE login = @login", new { login }).FirstOrDefault();

            return user;
        }

        public int? Create(User user)
        {
            const string sqlQuery = "INSERT INTO Users (login, password, admin) " +
                                    "VALUES(@Login, @Password, @Admin); " +
                                    "SELECT CAST(SCOPE_IDENTITY() as int)";

            int? userId = _db.Query<int>(sqlQuery, user).FirstOrDefault();

            return userId;
        }
               
        #region IDisposable Support
        public void Dispose()
        {
            _db.Dispose();
        }
        #endregion
    }
}