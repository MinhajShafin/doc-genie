import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateCreator } from 'zustand';

export interface Appointment {
  id: number;
  patient: string;
  time: string;
  date: string;
  type: string;
  status: 'Confirmed' | 'Pending';
  avatar?: string;
  email: string;
  phone: string;
}

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: number, status: 'Confirmed' | 'Pending') => void;
}

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set) => ({
      appointments: [], // Initialize with empty array
      addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) =>
        set((state: AppointmentStore) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: Date.now(),
              status: 'Pending',
            },
          ],
        })),
      updateAppointmentStatus: (id: number, status: 'Confirmed' | 'Pending') =>
        set((state: AppointmentStore) => ({
          appointments: state.appointments.map((appointment: Appointment) =>
            appointment.id === id ? { ...appointment, status } : appointment
          ),
        })),
    }),
    {
      name: 'appointment-storage', // unique name for localStorage
    }
  )
);