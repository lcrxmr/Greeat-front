export default function (recipeCount = 0, action) {



    switch (action.type) {
        case 'add':

            var recipeCount = recipeCount + 1;
            return recipeCount;

            break;

        case 'delete':

            var recipeCount = recipeCount - 1;
            return recipeCount;

            break;



        default:

            return recipeCount;
            break;
    }

}