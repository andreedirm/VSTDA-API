namespace VSTDAA.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Intial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TodoEntries",
                c => new
                    {
                        TodoEntryId = c.Int(nullable: false, identity: true),
                        Entry = c.String(),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TodoEntryId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TodoEntries");
        }
    }
}
