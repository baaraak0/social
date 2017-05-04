import globalModel from '../../bridge/globalModel';

export const setAllItems = (data) => ({
	type: 'SET_ITEMS',
	data
});


// Get account balance - MyAccount page
export function getAllPosts() {
	return dispatch => {
		globalModel.getAllItems()
			.then((data) => {
				try {
					dispatch(setAllItems(data));
				}
				catch (error) {
					dispatch(setAllItems(data));
				}
			});
	};
}


