using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using Notes.Auth.Entities;

namespace Notes.Auth.Models
{
    public class UserRepository : IDisposable
    {
        // For work as "dbContext" need: install-package Dapper.Data
        readonly private IDbConnection _db;
        readonly private string _connectionString = ConfigurationManager.ConnectionStrings["NotePad"].ConnectionString;

        public UserRepository()
        {
            _db = new SqlConnection(_connectionString);
        }

        public User GetByName(string username)
        {
            User user = null;
            user = _db.Query<User>("SELECT * FROM users WHERE login = @username", new {username}).FirstOrDefault();
            return user;
        }

        #region IDisposable Support

        public void Dispose()
        {
            _db.Dispose();
        }
        #endregion
    }
}