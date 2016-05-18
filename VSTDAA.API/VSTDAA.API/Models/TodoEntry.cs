using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VSTDAA.API.Models
{
    public class TodoEntry
    {
        public int TodoEntryId { get; set; }

        public string Entry { get; set; }
        public int Priority { get; set; }
    }
}