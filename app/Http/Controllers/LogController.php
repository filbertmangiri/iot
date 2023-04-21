<?php

namespace App\Http\Controllers;

use App\Exports\LogsExport;
use App\Http\Resources\LogResource;
use App\Models\Log;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class LogController extends Controller
{
    protected $pagination = 10;

    protected $sort = [
        'column' => 'id',
        'direction' => 'desc',
    ];

    public function index(Request $request)
    {
        $builder = Log::query();

        /* Sorting */
        if ($request->has('sort')) {
            $sort = explode('-', $request->sort);

            if (in_array($sort[0], Log::getSortable()) && in_array($sort[1], ['asc', 'desc'])) {
                $builder = $builder->orderBy($sort[0], $sort[1]);
            } else {
                $builder = $builder->orderBy($this->sort['column'], $this->sort['direction']);
            }
        } else {
            $builder = $builder->orderBy($this->sort['column'], $this->sort['direction']);
        }

        /* Search */
        if ($request->has('search')) {
            $builder = $builder->where(function (Builder $builder) use ($request) {
                foreach (Log::getSearchable() as $column) {
                    $builder = $builder->orWhere($column, 'like', "%{$request->search}%");
                }
            });
        }

        /* Per Page */
        $builder = $builder->fastPaginate($request->per_page ?? $this->pagination)->onEachSide(2);

        $logs = fn () => LogResource::collection($builder)->additional([
            'queries' => [
                'page' => $request->page ?? '',
                'per_page' => $request->per_page ?? '',
                'search' => $request->search ?? '',
                'sort' => $request->sort ?? '',
            ],
            'meta' => [
                'default_per_page' => $this->pagination,
                'default_sort' => 'id-desc',
            ]
        ]);

        return Inertia::render('Log/Index', compact('logs'));
    }

    public function show(Log $log)
    {
        $log = LogResource::make($log);

        return Inertia::render('Log/Show', compact('log'));
    }

    public function export()
    {
        return Excel::download(new LogsExport, 'logs.xlsx');
    }
}
