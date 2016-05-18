using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using VSTDAA.API.Infrastructure;
using VSTDAA.API.Models;

namespace VSTDAA.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TodoEntriesController : ApiController
    {
        private TodoDataContext db = new TodoDataContext();

        // GET: api/TodoEntries
        public IQueryable<TodoEntry> GetTodoEntries()
        {
            return db.TodoEntries;
        }

        // GET: api/TodoEntries/5
        [ResponseType(typeof(TodoEntry))]
        public IHttpActionResult GetTodoEntry(int id)
        {
            TodoEntry todoEntry = db.TodoEntries.Find(id);
            if (todoEntry == null)
            {
                return NotFound();
            }

            return Ok(todoEntry);
        }

        // PUT: api/TodoEntries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTodoEntry(int id, TodoEntry todoEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todoEntry.TodoEntryId)
            {
                return BadRequest();
            }

            db.Entry(todoEntry).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TodoEntries
        [ResponseType(typeof(TodoEntry))]
        public IHttpActionResult PostTodoEntry(TodoEntry todoEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TodoEntries.Add(todoEntry);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = todoEntry.TodoEntryId }, todoEntry);
        }

        // DELETE: api/TodoEntries/5
        [ResponseType(typeof(TodoEntry))]
        public IHttpActionResult DeleteTodoEntry(int id)
        {
            TodoEntry todoEntry = db.TodoEntries.Find(id);
            if (todoEntry == null)
            {
                return NotFound();
            }

            db.TodoEntries.Remove(todoEntry);
            db.SaveChanges();

            return Ok(todoEntry);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TodoEntryExists(int id)
        {
            return db.TodoEntries.Count(e => e.TodoEntryId == id) > 0;
        }
    }
}