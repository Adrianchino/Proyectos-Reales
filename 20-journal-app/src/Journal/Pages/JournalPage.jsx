import { IconButton } from "@mui/material"
import { JournalLayout } from "../Layout/JournalLayout"
import { NoteView } from "../Views/NoteView"
import { NothingSelectedView } from "../Views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNot } from "../../Store/Journal/thunks"

export const JournalPage = () => {

	const dispatch = useDispatch();
	const { isSaving, active } = useSelector( state => state.journal);

	const onClickNewTote = () =>{

		dispatch( startNewNot() );
	}

	return (
		<JournalLayout>

			{
				(!!active)
				? <NoteView />
				: <NothingSelectedView />
			}


			<IconButton
				onClick={ onClickNewTote }
				size="large"
				disabled={ isSaving }
				sx={{
					color: "white",
          bgcolor: "error.main",
          ":hover": {
            bgcolor: "error.main",
            opacity: 0.9,
          },
          position: "fixed",
          right: 50,
          bottom: 60,
				}}
			>
				<AddOutlined sx={{ fontSize: 35 }}/>
			</IconButton>
		</JournalLayout>
	)
}