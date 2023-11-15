import { Button } from '@mui/material';

export default function NoItems({ data, itemType, onButtonClickHandler }) {
    return (
        <>
            {(!data || data.length === 0) &&
                <div className='centered'>
                    <div>There are no {itemType}s to display</div>
                    <Button variant="outlined" onClick={onButtonClickHandler}>
                        Create New {itemType}
                    </Button>
                </div>
            }
        </>
    )
}