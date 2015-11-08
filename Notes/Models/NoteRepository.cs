using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using Notes.Entities;

namespace Notes.Models
{
    public class NoteRepository : IDisposable
    {
        // For work as "dbContext" need: install-package Dapper.Data
        readonly private IDbConnection _db;
        readonly private string _connectionString = ConfigurationManager.ConnectionStrings["NotePad"].ConnectionString;

        public NoteRepository() { 
            _db = new SqlConnection(_connectionString);
        }

        // ############ Methods for GET list of notes ############

        public List<Note> GetAll()
        {
            List<Note> notes = new List<Note>();
            notes = _db.Query<Note>("SELECT" +
                                    " id," +
                                    " user_id as userId," +
                                    " create_time as createTime," +
                                    " publish," +
                                    " title," +
                                    " body" +
                                    " FROM Notes ORDER BY id DESC").ToList();
            return notes;
        }

        public List<Note> GetByUserId(int userId)
        {
            List<Note> notes = new List<Note>();
            notes = _db.Query<Note>("SELECT" +
                                    " id," +
                                    " user_id as userId," +
                                    " create_time as createTime," +
                                    " publish," +
                                    " title," +
                                    " body" +
                                    " FROM Notes Where publish = 'true' or user_id = @userId", new { userId }).ToList();
            return notes;
        }

        public List<Note> GetPublic()
        {
            List<Note> notes = new List<Note>();
            notes = _db.Query<Note>("SELECT" +
                                    " id," +
                                    " user_id as userId," +
                                    " create_time as createTime," +
                                    " publish," +
                                    " title," +
                                    " body" +
                                    " FROM Notes Where publish = 'true'").ToList();
            return notes;
        }

        // ############ CRUD methods for work with "NOTE" ############

        public Note GetById(int id)
        {
            Note note = null;
            note = _db.Query<Note>("SELECT" +
                                   " id," +
                                   " user_id as userId," +
                                   " create_time as createTime," +
                                   " publish," +
                                   " title," +
                                   " body" +
                                   " FROM Notes WHERE Id = @id", new { id }).FirstOrDefault();
            return note;
        }

        public int? Create(Note note)
        {
            const string sqlQuery = "INSERT INTO Notes (user_id, create_time, publish, title, body)" +
                                    " VALUES(@UserId, @CreateTime, @Publish, @Title, @Body);" +
                                    " SELECT CAST(SCOPE_IDENTITY() as int)";
            int? noteId = _db.Query<int>(sqlQuery, note).FirstOrDefault();
            
            return noteId;
        }

        public void Update(Note note)
        {
            const string sqlQuery = "UPDATE Notes SET " +
                                    "publish = @Publish, " +
                                    "title = @Title, " +
                                    "body = @Body " +
                                    "WHERE Id = @Id";
            _db.Execute(sqlQuery, note);
        }

        public void Delete(int id)
        {
            const string sqlQuery = "DELETE FROM Notes WHERE Id = @id";
            _db.Execute(sqlQuery, new { id } );
        }

        #region IDisposable Support

        // Этот код добавлен для правильной реализации шаблона высвобождаемого класса.
        public void Dispose()
        {
            _db.Dispose();
        }
        #endregion
    }
}