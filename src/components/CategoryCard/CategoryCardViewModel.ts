import { User, Users } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { FormatType, GenderType } from '../../models/Event';

type CategoryCardViewModelProps = {
  format: FormatType;
  gender: GenderType;
  teamCount?: number;
};

export const useCategoryCardViewModel = ({
  format,
  gender,
  teamCount,
}: CategoryCardViewModelProps) => {
  let iconColor: string;

  switch (gender) {
    case GenderType.Male:
      iconColor = colors.usersIconBackground;
      break;
    case GenderType.Female:
      iconColor = colors.primary;
      break;
    case GenderType.Mixed:
      iconColor = colors.mixedBackground;
      break;
    default:
      iconColor = colors.primary;
  }
  const Icon = format === FormatType.Doubles ? Users : User;

  const showTeams = format === FormatType.Doubles && teamCount !== undefined;

  return {
    iconColor,
    Icon,
    showTeams,
  };
};
