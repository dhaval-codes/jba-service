export const juniorFinder = (e) => {
    if (e === 'HOD') {
        return 'teacher'
    } else if (e === 'Co-ordinator') {
        return 'HOD'
    }
}