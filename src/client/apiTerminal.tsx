import { fetch, post, postFormData } from './webClient';

const apiTerminal = {
  async register(
    username: string,
    email: string,
    password: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await post('/api/Auth/register', {
        username,
        email,
        password,
      });
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.log(e);
      throw e;
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await post('/api/Auth/login', {
        email,
        password,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createDiverBlog(
    text: string,
    image: File | Blob,
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('Text', text);
      formData.append('Image', image);
      const response = await postFormData(
        '/api/DiverBlog/CreateNewBlog',
        formData,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createDiverComment(
    blogId: string,
    text: string,
    image: File | Blob,
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('BlogId', blogId);
      formData.append('Text', text);
      formData.append('Image', image);
      const response = await postFormData(
        '/api/DiverBlog/CreateNewComment',
        formData,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchApprovedDiverBlogsComments() {
    try {
      const response = fetch('/api/DiverBlog/FetchAllApprovedComments');
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createWeightlifterBlog(
    text: string,
    image: File | Blob,
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('Text', text);
      formData.append('Image', image);
      console.log(formData);
      const response = await postFormData(
        '/api/WeightlifterBlog/CreateNewBlog',
        formData,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createWeightlifterComment(
    blogId: string,
    text: string,
    image: File | Blob,
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('BlogId', blogId);
      formData.append('Text', text);
      formData.append('Image', image);
      const response = await postFormData(
        '/api/WeightlifterBlog/CreateNewComment',
        formData,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchApprovedWeightlifterBlogsComments() {
    try {
      const response = fetch('/api/WeightlifterBlog/FetchAllApprovedComments');
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchUnapprovedBlogsComments(authorization: string) {
    try {
      const response = await fetch(
        '/api/Admin/FetchAllUnapprovedBlogComments',
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async updateBlogCommentStatus(
    Id: string,
    Status: string,
    authorization: string
  ) {
    try {
      const response = post(
        '/api/Admin/ApproveOrRejectBlogComment',
        { Id, Status },
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createUserFeedback(
    authorization: string,
    location: string,
    coordinates: string,
    text?: string,
    image?: File | Blob,
    waveRead?: number | null,
    waveUnitId?: number | null,
    tempRead?: number | null,
    tempUnitId?: number | null,
    windSpeedIndex?: number | null,
    windSpeedUnitId?: number | null
  ) {
    try {
      const formData = new FormData();

      formData.append('LocationName', location);
      formData.append('Coordinates', coordinates);

      if (text) {
        formData.append('Text', text);
      }

      if (image) {
        formData.append('Image', image);
      }

      if (waveRead !== null && waveRead !== undefined) {
        formData.append('WaveRead', waveRead.toString());
      }

      if (waveUnitId !== null && waveUnitId !== undefined) {
        formData.append('WaveUnitId', waveUnitId.toString());
      }

      if (tempRead !== null && tempRead !== undefined) {
        formData.append('TempRead', tempRead.toString());
      }

      if (tempUnitId !== null && tempUnitId !== undefined) {
        formData.append('TempUnitId', tempUnitId.toString());
      }

      if (windSpeedIndex !== null && windSpeedIndex !== undefined) {
        formData.append('WindSpeedIndex', windSpeedIndex.toString());
      }

      if (windSpeedUnitId !== null && windSpeedUnitId !== undefined) {
        formData.append('WindSpeedUnitId', windSpeedUnitId.toString());
      }
      const response = await postFormData(
        '/api/DiverBlog/PostUserFeedback',
        formData,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAllLocations() {
    try {
      const response = fetch('/api/Utility/fetchAllLocations');
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAllUnits() {
    try {
      const response = fetch('/api/Utility/fetchAllUnits');
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async createFeedback(
    locationName: string,
    coordinates: string | null,
    waveRead: number | null,
    waveUnitId: string | null,
    tempRead: number | null,
    tempUnitId: string | null,
    windSpeedRead: number | null,
    windSpeedUnitId: string | null,
    image: File | Blob | null,
    text: string | null,
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('LocationName', locationName);
      if (coordinates) formData.append('Coordinates', coordinates);
      if (waveRead !== null) formData.append('WaveRead', waveRead.toString());
      if (waveUnitId !== null)
        formData.append('WaveUnitId', waveUnitId.toString());
      if (tempRead !== null) formData.append('TempRead', tempRead.toString());
      if (tempUnitId !== null)
        formData.append('TempUnitId', tempUnitId.toString());
      if (windSpeedRead !== null)
        formData.append('WindSpeedIndex', windSpeedRead.toString());
      if (windSpeedUnitId !== null)
        formData.append('WindSpeedUnitId', windSpeedUnitId.toString());
      if (image) formData.append('Image', image);
      if (text) formData.append('Text', text);

      const response = await postFormData(
        '/api/Diver/PostUserFeedback',
        formData,
        authorization
      );

      return response;
    } catch (e) {
      console.error('Error posting feedback:', e);
      throw e;
    }
  },
  async fetchAllFeedback(authorization: string) {
    try {
      const response = fetch('/api/Admin/FetchAllFeedbacks', authorization);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async deleteFeedback(Id: string, authorization: string) {
    try {
      const response = post('/api/Admin/DeleteFeedback', { Id }, authorization);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAllServerLogs(authorization: string) {
    try {
      const response = fetch('/api/Admin/FetchAllServerLogs', authorization);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async deleteServerLog(Id: string, authorization: string) {
    try {
      const response = post(
        '/api/Admin/DeleteServerLog',
        { Id },
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAllUserTrainingAndUniversalLogs(authorization: string) {
    try {
      const response = fetch(
        '/api/Weightlifter/FetchAllUserTrainingAndUniversalLogs',
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPublicUserData(username: string, authorization: string) {
    try {
      const response = await fetch(
        `/api/Weightlifter/FetchPublicUserData?Username=${encodeURIComponent(username)}`,
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async fetchAllTrainingUnits(authorization: string) {
    try {
      const response = fetch(
        '/api/Weightlifter/FetchAllTrainingUnits',
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async FetchAllTrainingTitles(authorization: string) {
    try {
      const response = fetch(
        '/api/Weightlifter/FetchAllTrainingTitles',
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async CreateNewUniversalReading(
    Name: string,
    Date: string,
    Measurment: number,
    UnitName: string,
    authorization: string
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/CreateNewUniversalReading',
        { Name, Date, Measurment, UnitName },
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async CreateNewTraining(
    trainingData: {
      Name: string;
      Date: string;
      TargetWeight: number;
      UnitName: string;
      TargetSets: number;
      TargetReps: number;
      Sets: { Reps: number; Text?: string; Image?: File }[];
    },
    authorization: string
  ) {
    try {
      const formData = new FormData();
      formData.append('Name', trainingData.Name);
      formData.append('Date', trainingData.Date);
      formData.append('TargetWeight', trainingData.TargetWeight.toString());
      formData.append('UnitName', trainingData.UnitName);
      formData.append('TargetSets', trainingData.TargetSets.toString());
      formData.append('TargetReps', trainingData.TargetReps.toString());

      trainingData.Sets.forEach((set, index) => {
        formData.append(`Sets[${index}].Reps`, set.Reps.toString());
        if (set.Text) {
          formData.append(`Sets[${index}].Text`, set.Text);
        }
        if (set.Image) {
          formData.append(`Sets[${index}].Image`, set.Image);
        }
      });

      const response = await postFormData(
        '/api/Weightlifter/CreateNewTraining',
        formData,
        authorization
      );

      return response;
    } catch (e) {
      console.error('Error creating new training:', e);
      throw e;
    }
  },
  async UpdateUniversalReadingPublicity(
    Name: string,
    IsPublic: boolean,
    authorization: string
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/UpdateUniversalReadingPublicity',
        { Name, IsPublic },
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async UpdateTrainingLogPublicity(
    Name: string,
    IsPublic: boolean,
    authorization: string
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/UpdateTrainingLogPublicity',
        { Name, IsPublic },
        authorization
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiTerminal;
