
USER_ROLES = (
    ('SUPER_USER', 'super_user'),
    ('ADMIN', 'admin'),
    ('TUTOR', 'tutor'),
    ('STUDENT', 'student'),
)

GENDER = (
    ('Male', 'male'),
    ('Female', 'female'),
    ('Other', 'other'),
)

ACTION_TYPES = (
    ('LOGIN', 'User logged in'),
    ('LOGOUT', 'User logged out'),
    ('REGISTERED', 'User registered'),
    ('PASSWORD_CHANGE', 'Changed password'),
    ('PROFILE_UPDATE', 'Updated profile'),
    ('SESSION_BOOKING', 'Booked a session'),
    ('SESSION_CANCEL', 'Canceled a session'),
    ('PAYMENT', 'Made a payment'),
)

WORK_TYPE = (
    ('CLASSWORK', 'Classwork'),
    ('HOMEWORK', 'Homework'),
)

DAY = (
    ('MONDAY', 'Monday'),
    ('TUESDAY', 'Tuesday'),
    ('WEDNESDAY', 'Wednesday'),
    ('THURSDAY', 'Thursday'),
    ('FRIDAY', 'Friday'),
    ('SATURDAY', 'Saturday'),
    ('SUNDAY', 'Sunday'),
)

COUNTRY = (
    ('Bangladesh', 'Bangladesh'),
    ('Australia', 'Australia'),
    ('United States', 'United States'),
)

OTP_PURPOSE = (
    ('LOGIN', 'Login'),
    ('REGISTER', 'Register'),
    ('RESET_PASSWORD', 'Reset Password'),
)