from ..models.student import Student

class StudentRepository:

    @staticmethod
    def create_student(user, data):
        return Student.objects.create(user=user, **data)
