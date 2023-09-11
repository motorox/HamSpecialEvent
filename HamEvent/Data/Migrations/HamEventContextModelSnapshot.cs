﻿// <auto-generated />
using System;
using HamEvent.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HamEvent.Data.Migrations
{
    [DbContext(typeof(HamEventContext))]
    partial class HamEventContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("DiplomaURL")
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
                            Id = new Guid("65ae0e1c-bc4e-4d63-9cac-45aa4287a7a4"),
                            Description = "YP20KQT Event",
                            DiplomaURL = "https://hamevent.brudiu.ro/static/diploma-background.jpg",
                            Name = "YP20KQT",
                            SecretKey = new Guid("d80e6662-22a5-412a-abac-0ee75b6435c6")
                        },
                        new
                        {
                            Id = new Guid("dd2cb606-bde9-4c93-b1eb-efdda0f5e86d"),
                            Description = "YP100UPT Event",
                            DiplomaURL = "https://hamevent.brudiu.ro/static/diploma-background.jpg",
                            Name = "YP100UPT",
                            SecretKey = new Guid("8479efeb-8b7a-445c-92ba-89a2a068224f")
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
