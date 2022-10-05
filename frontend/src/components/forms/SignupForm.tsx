import { Facebook, Google, LinkedIn } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    SxProps,
    TextField,
    Typography,
} from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { useFormik } from 'formik'
import { SignUpSchema } from '../../schemas/signUpSchema'
import authService from '../../services/authService'

interface Props {
    active: Boolean
}

export const SignupForm: React.FC<Props> = ({ active }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values, { setStatus, setSubmitting, setErrors }) => {
            setStatus()
            const { name, email, password, confirmPassword } = values
            await authService
                .register(name, email, password, confirmPassword)
                .then((data) => {
                    setStatus(data.message)
                    setSubmitting(false)
                })
                .catch((err) => {
                    setSubmitting(false)
                    if (err.message === 'validationError') {
                        setErrors(err.fileds)
                    } else {
                        setStatus(err.message)
                    }
                })
        },
    })

    const formStyle: SxProps = {
        position: 'absolute',
        height: '100%',
        width: '50%',
        top: 0,
        left: 0,
        py: 5,
        opacity: 0,
        zIndex: 1,
        transition: 'all .6s ease-in-out',
    }

    const activeStyle: SxProps = {
        transform: 'translateX(100%)',
        opacity: 1,
        zIndex: 5,
    }

    const flexCenter: SxProps = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Box sx={{ ...formStyle, ...(active ? activeStyle : {}) }}>
            <Box sx={{ ...flexCenter, height: '100%', width: '100%' }}>
                <Typography sx={{ mb: 2 }} variant="h4">
                    Sign up
                </Typography>

                <Box sx={{ display: 'flex', gap: '.25rem' }}>
                    <Avatar sx={{ background: red[500] }}>
                        <Google />
                    </Avatar>
                    <Avatar sx={{ background: blue[500] }}>
                        <Facebook />
                    </Avatar>
                    <Avatar sx={{ background: blue[800] }}>
                        <LinkedIn />
                    </Avatar>
                </Box>

                <Typography variant="body1">or use your email for registration</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                    <TextField
                        label="Name"
                        name="name"
                        size="small"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        size="small"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        size="small"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />

                    <TextField
                        label="Password"
                        name="confirmPassword"
                        type="password"
                        size="small"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                        }
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />

                    {formik.status && (
                        <Typography sx={{ color: 'red' }}>{formik.status}</Typography>
                    )}

                    <Button
                        sx={{ mt: 1, width: '10rem', background: red[400], borderRadius: 5 }}
                        variant="contained"
                        disabled={Boolean(formik.isSubmitting)}
                        onClick={() => formik.handleSubmit()}
                    >
                        {formik.isSubmitting ? <CircularProgress size={25} /> : 'Sign up'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
