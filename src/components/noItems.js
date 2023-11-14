import { Button } from '@mui/material';

export default function NoItems({ itemType, onButtonClickHandler }) {
    return (
        <>
            <div className='centered'>
                <div>There are no {itemType}s to display</div>
                <Button variant="outlined" onClick={onButtonClickHandler}>
                    Create New {itemType}
                </Button>
            </div>
        </>
    )
}