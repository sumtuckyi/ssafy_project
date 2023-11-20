from django.db import models

# Create your models here.
class DepositProduct(models.Model):
    dcls_month = models.TextField()
    fin_co_no = models.TextField()
    kor_co_nm = models.TextField()
    fin_prdt_cd = models.TextField()
    fin_prdt_nm = models.TextField()
    join_way = models.TextField()
    mtrt_int = models.TextField()
    spcl_cnd = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    etc_note = models.TextField()
    max_limit = models.IntegerField()
    dcls_strt_day = models.TextField()
    dcls_end_day = models.TextField()
    fin_co_subm_day = models.TextField()


class DepositOption(models.Model):
    product = models.ForeignKey(DepositProduct, on_delete=models.CASCADE)
    dcls_month = models.TextField()
    fin_co_no = models.TextField()
    fin_prdt_cd = models.TextField()
    intr_rate_type = models.TextField()	
    intr_rate_type_nm = models.TextField()	
    save_trm = models.TextField()	
    intr_rate = models.FloatField()	
    intr_rate2 = models.FloatField()


class SavingProduct(models.Model):
    dcls_month = models.TextField()
    fin_co_no = models.TextField()
    kor_co_nm = models.TextField()
    fin_prdt_cd = models.TextField(unique=True)
    fin_prdt_nm	= models.TextField()
    join_way = models.TextField()
    mtrt_int = models.TextField()
    spcl_cnd = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    etc_note = models.TextField()
    max_limit = models.IntegerField()
    dcls_strt_day = models.TextField()
    dcls_end_day = models.TextField()
    fin_co_subm_day = models.TextField()


class SavingOption(models.Model):
    product = models.ForeignKey(SavingProduct, on_delete=models.CASCADE)
    dcls_month = models.TextField()
    fin_co_no = models.TextField()
    fin_prdt_cd = models.TextField()
    intr_rate_type = models.TextField()
    intr_rate_type_nm = models.TextField()
    rsrv_type = models.TextField()
    rsrv_type_nm = models.TextField()
    save_trm = models.TextField()
    intr_rate = models.FloatField()
    intr_rate2 = models.FloatField()