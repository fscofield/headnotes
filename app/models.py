from django.db import models

class Document(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField(blank=True)
    html = models.TextField(blank=True)


class Annotation(models.Model):
    doc_id = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now=True)
    text = models.TextField(blank=True)

    def selection_range(self):

        if self.selection_end is None:
            return (self.selection_start, self.selection_start)
        else:
            return (self.selection_start, self.selection_end)
