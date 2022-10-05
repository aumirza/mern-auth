import { Box, Button, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useState } from 'react'
import { LoginForm } from '../components/forms/LoginForm'
import { SignupForm } from '../components/forms/SignupForm'
import { OverlayContainer } from '../components/OverlayContainer'

export const LoginPage = () => {
    const [rtl, setRtl] = useState<Boolean>(false)

    return (
        <Grid2 sx={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '35rem',
                    width: '50rem',
                    boxShadow: '0 14px 28px rgba(0,0,0,.25), 0 10px 20px rgba(0,0,0,.2)',
                }}
            >
                <SignupForm active={rtl} />
                <LoginForm active={rtl} />

                <OverlayContainer setRtl={setRtl} isRtl={rtl} />
            </Box>
        </Grid2>
    )
}
