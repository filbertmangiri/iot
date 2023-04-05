<?php

namespace App\Enums;

enum DeviceStatus: string
{
	case Good = 'good';
	case Bad = 'bad';

	public function label(): string
	{
		return match ($this) {
			self::Good => 'Good',
			self::Bad => 'Bad',
		};
	}
}
