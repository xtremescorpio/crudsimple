<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'name',
        'first_surname',
        'second_surname',
        'email',
        'birthday',
    ];

    protected $appends = [
        'fullname',
        'surname'
    ];

    public function getFullnameAttribute() {
        return $this->name . " " . $this->first_surname . " " . $this->second_surname;
    }

    public function getSurnameAttribute() {
        return $this->first_surname . " " . $this->second_surname;
    }
}
