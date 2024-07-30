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
    [Migration("20240727131549_Email")]
    partial class Email
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

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("ExcludeCallsigns")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("HasTop")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SecretKey")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Events");
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

                    b.Property<string>("Freq")
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
