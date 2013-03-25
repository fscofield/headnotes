from django.db import models

class Document(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField(blank=True)


class Annotation(models.Model):
    document = models.ForeignKey(Document)
    object_id = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now=True)
    selection_start = models.IntegerField()
    selection_end = models.IntegerField()
    annotation_text = models.TextField(blank=True)

    def __unicode__(self):
        return _(u"Annotation on '%s'") % self.document.name

    def selection_range(self):

        if self.selection_end is None:
            return (self.selection_start, self.selection_start)
        else:
            return (self.selection_start, self.selection_end)
