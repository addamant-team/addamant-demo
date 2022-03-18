<?php


class AttachmentPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Attachment $attachment)
    {
        $userHasTaskPassage = TaskPassage::query()
            ->where('user_id', $user->id)
            ->whereHas('attachments', function ($query) use ($attachment) {
                $query->where('id', $attachment->id);
            })
            ->exists();
        return $userHasTaskPassage || $user->hasRole(['admin']);
    }
}
