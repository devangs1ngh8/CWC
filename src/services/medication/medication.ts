import { apiPost, apiPut, apiDelete } from '../api/http';

export interface MedicationRequest {
  name: string;
  dosage: string;
  unit: number;
  time: number;
  logDate: string;
}

export interface UpdateMedicationRequest extends MedicationRequest {
  medicationId: string;
}

export interface MedicationResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    dosage: string;
    unit: number;
    time: number;
  };
}

export const addMedication = async (payload: MedicationRequest) => {
  return apiPost<MedicationResponse>('/user/medication', payload);
};

export const updateMedication = async (payload: UpdateMedicationRequest) => {
  return apiPut<MedicationResponse>('/user/medication', payload);
};

export interface DeleteMedicationResponse {
  status: number;
  message: string;
  data?: any;
}

export const deleteMedication = async (
  medicationId: string,
): Promise<DeleteMedicationResponse> => {
  return apiDelete<DeleteMedicationResponse>('/user/medication', {
    params: { medicationId },
  });
};
