import { startOfHour } from 'date-fns';
import Appontment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }: RequestDTO): Appontment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked !');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
