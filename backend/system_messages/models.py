from django.db import models

from django.db import models

class SystemMessage(models.Model):
    message_text = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.message_text
