export const SemesterFromDateFunc = (date) => {
    const draftDate = new Date(date);
    const month = draftDate.getMonth() + 1; 
    if (month >= 4 && month <= 9) {
        console.log('Semester1');
    } else if (month >= 10 || month <= 3) {
        console.log('Semester2');
    }
}
