<?php

class SchoolService
{
    public function index(): LengthAwarePaginator
    {
        return School::query()->paginate();
    }

    public function store($data): int
    {
        /** @var School $school */
        $school = School::query()->create($data);
        return $school->id;
    }

    public function show($id): School
    {
        /** @var School $school */
        $school = School::query()->findOrFail($id);
        return $school;
    }

    /**
     * @throws Exception
     */
    public function update($data, $id): School
    {
        /** @var School $school */
        $school = School::query()->findOrFail($id)->fill($data);
        if (!$school->save()) {
            throw new Exception(__('exception.updating_failed'));
        }
        return $school;
    }

    /**
     * @throws Exception
     */
    public function destroy($id): bool
    {
        $school = School::query()->findOrFail($id);
        if (!$school->delete()) {
            throw new Exception(__('exception.deleting_failed'));
        }
        return true;
    }

    public function attachModerators($data): void
    {
        /** @var School $school */
        $school = School::query()->findOrFail($data['school_id']);

        $users = User::query()->whereIn('id', $data['user_ids'])->get();

        $school->moderators()->attach($users);
    }

    public function listModerators($data): LengthAwarePaginator
    {
        return User::filter($data)->paginate();
    }
}
