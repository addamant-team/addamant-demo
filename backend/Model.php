<?php

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $owner_id
 * @property int $logo_id
 * @property bool $is_available
 *
 * relations
 * @property User $owner
 * @property User[] $moderators
 * @property Course $course
 * @property File $logo
 */
class School extends Model
{
    use HasFactory;
    use Filterable;
    use HasSchoolLogo;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'logo_id',
        'is_available',
    ];

    protected static function booted()
    {
        static::addGlobalScope(new SchoolOwnerSchoolsScope());
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function moderators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, SchoolModerator::class, 'school_id', 'user_id');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function logo(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
