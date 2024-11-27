import { fetch, post, postFormData } from './webClient';

const apiTerminal = {
  async register(username: string, email: string, password: string) {
    try {
      const response = await post('/api/Auth/register', {
        username,
        email,
        password,
      });
      return response;
    } catch (e) {
      console.log(e);
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
  async fetchApprovedWeightlifterBlogsComments() {},
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
};

export default apiTerminal;
