export default function (eventCount = 0, action) {



    switch (action.type) {
        case 'add':

            var eventCount = eventCount + 1;
            return eventCount;

            break;

        case 'delete':

            var eventCount = eventCount - 1;
            return eventCount;

            break;



        default:

            return eventCount;
            break;
    }

}