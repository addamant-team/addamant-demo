<?php

class CourseCompilationController
{
    public function __construct(private CourseCompilationService $service, private CacheManager $cache)
    {
    }

    public function index(): JsonResponse
    {
        $compilations = $this->cache->rememberForever('courses.compilations', function () {
            return CourseCompilation::query()->visible()->get();
        });

        return responder()->success($compilations, new CompilationTransformer())->respond();
    }

    public function show(string $id): JsonResponse
    {
        $compilation = $this->service->show($id);

        return responder()->success($compilation, new CompilationTransformer())->respond();
    }
}
