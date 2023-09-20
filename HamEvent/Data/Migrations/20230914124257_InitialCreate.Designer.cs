﻿// <auto-generated />
using System;
using HamEvent.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HamEvent.Data.Migrations
{
    [DbContext(typeof(HamEventContext))]
    [Migration("20230914124257_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.5");

            modelBuilder.Entity("HamEvent.Data.Model.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Diploma")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("SecretKey")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            Id = new Guid("17f1e8ba-a39e-4d43-b627-89c4a6bb6de2"),
                            Description = "YP20KQT Event",
                            Diploma = "<STYLE type=\"text/css\">\r\n    html, body {\r\n        margin: 0;\r\n        padding: 0;\r\n    }\r\n\r\n    h1 {\r\n        text-align: center;\r\n        font-size: xx-large;\r\n        margin-bottom: 20px;\r\n    }\r\n\r\n    h2 {\r\n        text-align: center;\r\n        font-size: x-large;\r\n        margin-top: 30px;\r\n        margin-bottom: 10px;\r\n    }\r\n\r\n    h3 {\r\n        text-align: center;\r\n        font-size: large;\r\n        margin-top: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n\r\n    p {\r\n        font-size: 18px;\r\n        line-height: 1.5;\r\n        text-align: center;\r\n        margin-bottom: 10px;\r\n    }\r\n\r\n    img {\r\n        display: block;\r\n        margin: 20px auto 0;\r\n        max-width: 150px;\r\n    }\r\n\r\n    .background {\r\n        background-image: url(https://hamevent.brudiu.ro/static/diploma-background.jpg);\r\n        width: 842px;\r\n        height: 595px;\r\n        margin: 0;\r\n        padding: 0;\r\n        background-position: center center;\r\n        background-size: 100%;\r\n        background-repeat: no-repeat;\r\n        position: relative;\r\n    }\r\n\r\n    .diploma {\r\n        position: absolute;\r\n        top: 50%;\r\n        left: 50%;\r\n        -ms-transform: translate(-50%, -50%);\r\n        transform: translate(-50%, -50%);\r\n        margin: 0 auto;\r\n        padding: 30px;\r\n    }\r\n</STYLE>\r\n<html>\r\n<body>\r\n    <div class=\"background\">\r\n        <div class=\"diploma\">\r\n            <h1>--EventName--</h1>\r\n            <p>--EventDescription--</p>\r\n            <p>We take the pleasure in awarding</p>\r\n            <h2>--callsign2--</h2>\r\n\r\n            <h3>Points:--Points--</h3>\r\n            <h3>QSO:--QSOs--</h3>\r\n            <h3>Bands:--Bands--</h3>\r\n            <h3>Modes:--Modes--</h3>\r\n\r\n            <img src=\"./static/radio-icon.png\" alt=\"Ham Special Event\">\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>",
                            Name = "YP20KQT",
                            SecretKey = new Guid("300d22d7-12dd-4c2a-bd3c-72092412867e")
                        },
                        new
                        {
                            Id = new Guid("d6ba0da8-7d84-419c-8f2f-d33835e66625"),
                            Description = "YP100UPT Event",
                            Diploma = "",
                            Name = "YP100UPT",
                            SecretKey = new Guid("360a0e32-a84e-4e6b-ba50-180ce51cc8b5")
                        });
                });

            modelBuilder.Entity("HamEvent.Data.Model.QSO", b =>
                {
                    b.Property<string>("Callsign1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Callsign2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Band")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mode")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("EventId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RST1")
                        .HasColumnType("TEXT");

                    b.Property<string>("RST2")
                        .HasColumnType("TEXT");

                    b.HasKey("Callsign1", "Callsign2", "Band", "Mode", "Timestamp", "EventId");

                    b.HasIndex("EventId");

                    b.ToTable("QSOs");
                });

            modelBuilder.Entity("HamEvent.Data.Model.QSO", b =>
                {
                    b.HasOne("HamEvent.Data.Model.Event", "Event")
                        .WithMany("QSOs")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("HamEvent.Data.Model.Event", b =>
                {
                    b.Navigation("QSOs");
                });
#pragma warning restore 612, 618
        }
    }
}