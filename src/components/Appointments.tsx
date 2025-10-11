import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User as UserIcon, // Renamed to avoid conflict with mockCounsellors type
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Appointment {
  id: string;
  date: string;
  time: string;
  counsellor: string;
  type: "video" | "phone" | "in-person";
  status: "scheduled" | "completed" | "cancelled";
  location?: string;
  notes?: string;
}

const mockCounsellors = [
  {
    id: "1",
    name: "Dr. Meera Kapoor",
    specialization: "Anxiety & Depression",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Arjun Menon",
    specialization: "Student Mental Health",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Dr. Nisha Verma",
    specialization: "Crisis Intervention",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Dr. Rajesh Khanna",
    specialization: "Cognitive Behavioral Therapy",
    rating: 4.7,
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "1",
    date: "2025-10-18",
    time: "10:00",
    counsellor: "Dr. Meera Kapoor",
    type: "video",
    status: "scheduled",
    notes: "Follow-up session for anxiety management",
  },
  {
    id: "2",
    date: "2025-09-15",
    time: "14:30",
    counsellor: "Dr. Rajesh Khanna",
    type: "in-person",
    status: "completed",
    location: "Student Counseling Center, Room 203",
  },
  {
    id: "3",
    date: "2025-10-22",
    time: "11:00",
    counsellor: "Dr. Arjun Menon",
    type: "phone",
    status: "scheduled",
  },
];

export default function Appointments() {
  const { profile } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState<
    "video" | "phone" | "in-person"
  >("video");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const handleBookAppointment = () => {
    if (!selectedCounsellor || !selectedDate || !selectedTime) {
      toast.error("Please select a counsellor, date, and time.");
      return;
    }
    const counsellorInfo = mockCounsellors.find(
      (c) => c.id === selectedCounsellor
    );
    if (!counsellorInfo) {
      toast.error("Selected counsellor not found.");
      return;
    }
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      counsellor: counsellorInfo.name,
      type: appointmentType,
      status: "scheduled",
      notes: notes,
    };

    setAppointments((prevAppointments) => [
      newAppointment,
      ...prevAppointments,
    ]);
    toast.success("Appointment booked successfully!");
    setShowBooking(false);
    setSelectedCounsellor("");
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  const getStatusColor = (status: string) => {
    // Using themed badge classes
    switch (status) {
      case "scheduled":
        return "badge-info";
      case "completed":
        return "badge-success";
      case "cancelled":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "in-person":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const upcomingAppointments = appointments
    .filter((apt) => apt.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastAppointments = appointments.filter(
    (apt) => apt.status !== "scheduled"
  );

  // --- Booking Modal (Renders when showBooking is true) ---
  const bookingInputClass =
    "w-full border border-theme-divider rounded-md px-3 py-2 text-primary bg-secondary placeholder-themed focus:ring-accent focus:border-accent";
  const bookingLabelClass = "block text-sm font-medium text-secondary mb-2";

  if (showBooking) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* KEY FIX 1: Modal uses feature-card background */}
        <div className="feature-card p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Book New Appointment
            </h1>
            <button
              onClick={() => setShowBooking(false)}
              className="text-secondary hover:text-primary"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className={bookingLabelClass}>Select a Counsellor</label>
              <div className="grid gap-4">
                {mockCounsellors.map((counsellor) => (
                  <div
                    key={counsellor.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCounsellor === counsellor.id
                        ? "border-accent bg-active-bg" // Selected state theme
                        : "border-theme-divider hover:border-accent hover-bg-secondary" // Default state theme
                    }`}
                    onClick={() => setSelectedCounsellor(counsellor.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-primary">
                          {counsellor.name}
                        </h3>
                        <p className="text-sm text-secondary">
                          {counsellor.specialization}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">
                          ★ {counsellor.rating}
                        </div>
                        <div className="text-xs text-secondary">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className={bookingLabelClass}>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={bookingInputClass}
              />
            </div>
            <div>
              <label className={bookingLabelClass}>Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 text-sm rounded-md border ${
                      selectedTime === time
                        ? "bg-accent text-white border-accent" // Selected state theme
                        : "bg-secondary text-primary border-theme-divider hover-bg-secondary" // Default state theme
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={bookingLabelClass}>Appointment Type</label>
              <div className="grid grid-cols-3 gap-4">
                {["video", "phone", "in-person"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAppointmentType(type as any)}
                    className={`flex items-center justify-center py-3 px-4 border rounded-lg ${
                      appointmentType === type
                        ? "bg-accent text-white border-accent" // Selected state theme
                        : "bg-secondary text-primary border-theme-divider hover-bg-secondary" // Default state theme
                    }`}
                  >
                    {getTypeIcon(type)}
                    <span className="ml-2 capitalize">
                      {type === "in-person" ? "In-Person" : type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={bookingLabelClass}>
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific concerns or topics you'd like to discuss..."
                className={bookingInputClass}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBookAppointment}
                className="flex-1 bg-accent text-white py-3 px-4 rounded-md hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setShowBooking(false)}
                className="px-6 py-3 border border-theme-divider text-primary rounded-md hover-bg-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Appointments List View ---
  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Appointments</h1>
          <p className="text-secondary">Manage your counselling sessions</p>
        </div>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Book New Appointment
        </button>
      </div>

      {/* Immediate Help Banner */}
      {/* KEY FIX 2: Banner uses themed colors, preserving red urgency */}
      <div className="feature-card border-l-4 border-red-500 p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-primary">
              Need Immediate Help?
            </h3>
            <p className="text-sm text-secondary">
              Crisis Helpline: 1-800-273-8255 (Available 24/7)
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments List */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <h2 className="text-lg font-semibold text-primary">
            Upcoming Appointments
          </h2>
        </div>
        {upcomingAppointments.length > 0 ? (
          <div className="divide-y divide-theme-divider">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Themed Avatar */}
                    <div className="sidebar-avatar-bg rounded-full p-3 text-accent">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-primary">
                          {appointment.counsellor}
                        </h3>
                        {/* Themed Status Badge */}
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">
                            {appointment.status}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-secondary">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center capitalize">
                          {getTypeIcon(appointment.type)}
                          <span className="ml-1">
                            {appointment.type === "in-person"
                              ? "In-Person"
                              : appointment.type}
                          </span>
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-secondary mt-2">
                          {appointment.notes}
                        </p>
                      )}
                      {appointment.location && (
                        <p className="text-sm text-secondary mt-1 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {appointment.status === "scheduled" && (
                      <button className="text-accent hover:opacity-80 text-sm font-medium">
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-sm font-medium text-primary mb-1">
              No upcoming appointments
            </h3>
            <p className="text-sm text-secondary">
              Book your first session to get started
            </p>
          </div>
        )}
      </div>

      {/* Past Appointments List */}
      <div className="feature-card">
        <div className="p-6 border-b border-theme-divider">
          <h2 className="text-lg font-semibold text-primary">
            Past Appointments
          </h2>
        </div>
        <div className="divide-y divide-theme-divider">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 opacity-75">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Themed Avatar */}
                  <div className="sidebar-avatar-bg rounded-full p-3 text-secondary">
                    {getTypeIcon(appointment.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-primary">
                        {appointment.counsellor}
                      </h3>
                      {/* Themed Status Badge */}
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">
                          {appointment.status}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-secondary">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </span>
                    </div>
                    {appointment.location && (
                      <p className="text-sm text-secondary mt-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {appointment.location}
                      </p>
                    )}
                  </div>
                </div>
                <button className="text-accent hover:opacity-80 text-sm font-medium">
                  View Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
