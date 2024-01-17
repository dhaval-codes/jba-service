export const seniorFinder = (e) => {
    if (e === 'teacher'){
        return 'HOD'
    } else if (e === 'HOD') {
        return 'Co-ordinator'
    } else {
        return 'Principal'
    }
}