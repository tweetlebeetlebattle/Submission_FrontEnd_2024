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
  async login(
    email: string,
    password: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await post('/api/Auth/login', {
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
  async createDiverBlog(
    text: string,
    image: File | Blob,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const formData = new FormData();
      formData.append('Text', text);
      formData.append('Image', image);
      console.log('FormData content:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await postFormData(
        '/api/DiverBlog/CreateNewBlog',
        formData,
        authorization
      );
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
  async createDiverComment(
    blogId: string,
    text: string,
    image: File | Blob,
    authorization: string,
    navigate: (path: string, state?: any) => void
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
  async fetchApprovedDiverBlogsComments(
    blogsPerPage: number,
    currentPage: number,
    navigate: (path: string, state?: any) => void
  ): Promise<any> {
    try {
      const response = await fetch(
        `/api/DiverBlog/FetchAllApprovedComments?blogsPerPage=${blogsPerPage}&pageNumber=${currentPage}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching Diver blogs:', e);
      throw e;
    }
  },
  async createWeightlifterBlog(
    text: string,
    image: File | Blob,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const formData = new FormData();
      formData.append('Text', text);
      formData.append('Image', image);
      const response = await postFormData(
        '/api/WeightlifterBlog/CreateNewBlog',
        formData,
        authorization
      );
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
  async createWeightlifterComment(
    blogId: string,
    text: string,
    image: File | Blob,
    authorization: string,
    navigate: (path: string, state?: any) => void
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
  async fetchApprovedWeightlifterBlogsComments(
    blogsPerPage: number,
    currentPage: number,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/WeightlifterBlog/FetchAllApprovedComments?blogsPerPage=${blogsPerPage}&pageNumber=${currentPage}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching blogs:', e);
      throw e;
    }
  },
  async fetchUnapprovedBlogsComments(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        '/api/Admin/FetchAllUnapprovedBlogComments',
        authorization
      );
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
  async updateBlogCommentStatus(
    Id: string,
    Status: string,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = post(
        '/api/Admin/ApproveOrRejectBlogComment',
        { Id, Status },
        authorization
      );
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
  async fetchAllLocations(navigate: (path: string, state?: any) => void) {
    try {
      const response = fetch('/api/Utility/GetAllLocations');
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
  async fetchAllUnits(navigate: (path: string, state?: any) => void) {
    try {
      const response = fetch('/api/Utility/GetAllUnits');
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
    authorization: string,
    navigate: (path: string, state?: any) => void
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
  async fetchAllFeedback(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = fetch('/api/Admin/FetchAllFeedbacks', authorization);
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
  async deleteFeedback(
    Id: string,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = post('/api/Admin/DeleteFeedback', { Id }, authorization);
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
  async fetchAllServerLogs(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = fetch('/api/Admin/FetchAllServerLogs', authorization);
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
  async deleteServerLog(
    Id: string,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = post(
        '/api/Admin/DeleteServerLog',
        { Id },
        authorization
      );
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
  async fetchAllUserTrainingAndUniversalLogs(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      console.log(authorization);
      const response = fetch(
        '/api/Weightlifter/FetchAllUserTrainingAndUniversalLogs',
        authorization
      );
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
  async fetchPublicUserData(
    username: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Weightlifter/FetchPublicUserData?Username=${encodeURIComponent(username)}`
      );
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
  async fetchAllTrainingUnits(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = fetch(
        '/api/Weightlifter/FetchAllTrainingUnits',
        authorization
      );
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
  async FetchAllTrainingTitles(
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = fetch(
        '/api/Weightlifter/FetchAllTrainingTitles',
        authorization
      );
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
  async CreateNewUniversalReading(
    Name: string,
    Date: string,
    Measurment: number,
    UnitName: string,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/CreateNewUniversalReading',
        { Name, Date, Measurment, UnitName },
        authorization
      );
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
    authorization: string,
    navigate: (path: string, state?: any) => void
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
  async UpdateUniversalReadingPublicity(
    Name: string,
    IsPublic: boolean,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/UpdateUniversalReadingPublicity',
        { Name, IsPublic },
        authorization
      );
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
  async UpdateTrainingLogPublicity(
    Name: string,
    IsPublic: boolean,
    authorization: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await post(
        '/api/Weightlifter/UpdateTrainingLogPublicity',
        { Name, IsPublic },
        authorization
      );
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
  async FetchNumberOfApprovedDiverBlogs(
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        '/api/DiverBlog/FetchNumberOfApprovedDiverBlogs'
      );
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
  async FetchNumberOfApprovedWeightlifterBlogs(
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        '/api/WeightlifterBlog/FetchNumberOfApprovedWeightlifterBlogs'
      );
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
  async FetchSearchSuggestions(
    queryTarget: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Utility/FetchSearchSuggestions?searchQuery.SearchQuery=${encodeURIComponent(queryTarget)}`
      );
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
  async FetchNumberOfApprovedUserDiverBlogs(
    queryTarget: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/DiverBlog/FetchNumberOfApprovedUserDiverBlogs?SearchQuery=${encodeURIComponent(queryTarget)}`
      );
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
  async FetchNumberOfApprovedUserWeightlifterBlogs(
    queryTarget: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/WeightlifterBlog/FetchNumberOfApprovedUserWeightlifterBlogs?searchQuery.SearchQuery=${encodeURIComponent(queryTarget)}`
      );
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
  async fetchApprovedUserDiverBlogsComments(
    blogsPerPage: number,
    currentPage: number,
    username: string,
    navigate: (path: string, state?: any) => void
  ): Promise<any> {
    try {
      const response = await fetch(
        `/api/DiverBlog/FetchApprovedUserDiverBlogs?blogsPerPage=${blogsPerPage}&pageNumber=${currentPage}&username=${encodeURIComponent(username)}`
      );

      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching Diver blogs:', e);
      throw e;
    }
  },
  async FetchApprovedUserWeightlifterBlogs(
    blogsPerPage: number,
    currentPage: number,
    username: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/WeightlifterBlog/FetchApprovedUserWeightlifterBlogs?blogsPerPage=${blogsPerPage}&pageNumber=${currentPage}&username=${encodeURIComponent(username)}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching blogs:', e);
      throw e;
    }
  },
  async FetchHistoricSeaDataByLocationHTML(
    location: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Diver/FetchHistoricSeaDataByLocationHTML?location=${encodeURIComponent(location)}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching blogs:', e);
      throw e;
    }
  },
  async FetchHistoricSeaDataByLocationGif(
    location: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Diver/FetchHistoricSeaDataByLocationGif?location=${encodeURIComponent(location)}`
      );
      return response;
    } catch (e: any) {
      console.error('Error fetching GIF data:', e);
      throw e;
    }
  },
  async FetchHistoricSeaDataByLocationStorm(
    location: string,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Diver/FetchHistoricSeaDataByLocationStorm?location=${encodeURIComponent(location)}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching blogs:', e);
      throw e;
    }
  },
  async FetchIndexSeaDataByPeriod(
    period: number,
    navigate: (path: string, state?: any) => void
  ) {
    try {
      const response = await fetch(
        `/api/Diver/FetchIndexSeaDataByPeriod?period=${encodeURIComponent(period)}`
      );
      return response;
    } catch (e: any) {
      if (e?.response?.status === 500) {
        navigate('/500', {
          state: {
            details: e?.response?.data?.Details || 'Unknown error occurred.',
          },
        });
      }
      console.error('Error fetching indecies:', e);
      throw e;
    }
  },
};

export default apiTerminal;
