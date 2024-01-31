const url = 'https://sukoco.herokuapp.com';

const BackEnd = {
    login: url + '/user/login',
    logout: url + '/user/logout',
    editProfile: url + '/user/editProfile',
    register: url + '/user/register',
    
    timetableAdd: url + '/timetable/add',
    timetableDelete: url + '/timetable/delete',
    timetableGet: url + '/timetable',

    recentReview: url + '/review/recent',
    reviewByProfessor: url + '/review/',
    reviewPost: url + '/review/post', // Post Method
    reviewReport : url + '/review',
    reviewDelete: url + '/review',

    courseGet: url + '/course/',
    courseAll: url + '/course',

    getProfessor: url+ '/professor/'
};

export default BackEnd;