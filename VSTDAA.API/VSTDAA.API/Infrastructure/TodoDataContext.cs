using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using VSTDAA.API.Models;

namespace VSTDAA.API.Infrastructure
{
    public class TodoDataContext : DbContext
    {
        public TodoDataContext() : base("Todo")
        {

        }

        public IDbSet<TodoEntry> TodoEntries { get; set; }
    }
}