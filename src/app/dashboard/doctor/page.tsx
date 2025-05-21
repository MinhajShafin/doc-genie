"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, Users, Activity } from "lucide-react";
import { toast } from "react-hot-toast";

interface Appointment {
  _id: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending";
  email: string;
  phone: string;
}

const DoctorDashboardPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/doctor/appointments");
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to fetch appointments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Update appointment status
  const updateAppointmentStatus = async (
    id: string,
    status: "Confirmed" | "Pending"
  ) => {
    try {
      const response = await fetch("/api/doctor/appointments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) throw new Error("Failed to update appointment");

      await fetchAppointments();
      toast.success("Appointment updated successfully");
    } catch (error) {
      toast.error("Failed to update appointment");
      console.error(error);
    }
  };

  // Delete appointment
  const deleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/doctor/appointments?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete appointment");

      await fetchAppointments();
      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete appointment");
      console.error(error);
    }
  };

  // Filter appointments for today
  const todayAppointments = appointments.filter((apt) => apt.date === today);

  // Calculate stats based on real data
  const stats = [
    {
      title: "Total Patients",
      value: appointments.length.toString(),
      icon: Users,
      description: "Total appointments",
    },
    {
      title: "Appointments Today",
      value: todayAppointments.length.toString(),
      icon: CalendarIcon,
      description: "Scheduled for today",
    },
    {
      title: "Pending Appointments",
      value: appointments
        .filter((apt) => apt.status === "Pending")
        .length.toString(),
      icon: Clock,
      description: "Awaiting confirmation",
    },
    {
      title: "Confirmed Appointments",
      value: appointments
        .filter((apt) => apt.status === "Confirmed")
        .length.toString(),
      icon: Activity,
      description: "Total confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/doctor.jpg" alt="Dr. John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Dr. John Doe</h2>
              <p className="text-sm text-gray-500">General Practitioner</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Settings</Button>
            <Button>View Schedule</Button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <div className="grid gap-6">
          {/* Stats Section */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Appointments Table */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>
                  {appointments.length === 0
                    ? "No appointments scheduled"
                    : `Total of ${appointments.length} appointment${
                        appointments.length === 1 ? "" : "s"
                      }`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading appointments...
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No appointments scheduled
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment._id}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {appointment.patient}
                          </TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === "Confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {appointment.status === "Pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment._id,
                                      "Confirmed"
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  deleteAppointment(appointment._id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Calendar Card */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Schedule overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboardPage;
