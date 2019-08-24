/**
 *
 * @param {Number} timestamp
 */
export const timestampToLocalDateTime = timestamp => {
    const date = new Date(timestamp);
    return (
        date.toLocaleDateString() +
        ' ' +
        [
            date.getHours(),
            date.getMinutes() || '00',
            date.getSeconds() || '00',
        ].join(':')
    );
};
