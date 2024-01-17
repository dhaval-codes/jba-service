export const departmentWiseFormType = (e) => {
    if(e === 'cs') {
        return 'cs'
    } else if (e === 'lib') {
        return 'lib'
    } else if (e === 'perArts') {
        return 'perArts'
    } else if (e === 'pe') {
        return 'pe'
    } else if (e === 'art') {
        return 'art';
    } else {
        return 'general'
    }
}