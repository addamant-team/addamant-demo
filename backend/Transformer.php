<?php


class TestShowTransformer extends Transformer
{
    /**
     * List of available relations.
     *
     * @var string[]
     */
    protected $relations = [
    ];

    /**
     * List of autoloaded default relations.
     *
     * @var array
     */
    protected $load = [
        'questions' => QuestionTransformer::class,
    ];

    /**
     * Transform the model.
     *
     * @return array
     */
    public function transform(Test $test)
    {
        return [
            'id' => (int) $test->id,
            'name' => $test->name,
            'questions' => $test->questions->map(function ($question) {
                return (new QuestionTransformer())->transform($question);
            }),
        ];
    }
}
