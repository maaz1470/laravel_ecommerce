<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent',
        'url',
        'status'
    ];

    protected $table = 'sub_categories';

    protected $hidden = ['created_at','updated_at'];

    public function parentCategory(){
        return $this->belongsTo(Category::class, 'parent');
    }

}
