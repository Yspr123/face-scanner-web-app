import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { FacesResponse, RegisterFaceRequest, RecogniseRequest, RecogniseResponse } from '@/types';
import { toast } from '@/hooks/use-toast';

export const useFaces = () => {
  return useQuery<FacesResponse>({
    queryKey: ['faces'],
    queryFn: async () => {
      const response = await api.get<FacesResponse>('/faces');
      return response.data;
    },
  });
};

export const useRegisterFace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RegisterFaceRequest) => {
      const response = await api.post('/register', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faces'] });
      toast({
        title: "Success!",
        description: "Face registered successfully.",
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || 'Registration failed';
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};

export const useRecogniseFace = () => {
  return useMutation({
    mutationFn: async (data: RecogniseRequest) => {
      const response = await api.post<RecogniseResponse>('/recognise', data);
      return response.data;
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || 'Recognition failed';
      toast({
        title: "Recognition Failed",
        description: message,
        variant: "destructive",
      });
    },
  });
};