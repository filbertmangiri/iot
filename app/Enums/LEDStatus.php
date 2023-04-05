<?php

namespace App\Enums;

enum LEDStatus: string
{
	case ON = 'on';
	case OFF = 'off';

	public function label(): string
	{
		return match ($this) {
			self::ON => 'On',
			self::OFF => 'Off',
		};
	}
}
