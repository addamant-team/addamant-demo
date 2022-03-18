<?php

class AnswerIsRelatedToTest implements Rule
{
    private $truth;

    private $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(private $testId, ?bool $truth = true)
    {
        $this->truth = $truth;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->message = $attribute . __('exception.is_not_related');

        /** @var Test $test */
        $test = Test::query()->find($this->testId);
        $answerIds = $test->answers->pluck('id')->toArray();

        $isRelated = in_array($value, $answerIds);

        return $this->truth ? $isRelated : !$isRelated;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
