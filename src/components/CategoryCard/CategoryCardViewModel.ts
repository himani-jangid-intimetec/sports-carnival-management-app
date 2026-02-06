import { User, Users } from 'lucide-react-native';
import { colors } from '../../theme/colors';

type CategoryCardViewModelProps = {
  format: 'Singles' | 'Doubles';
  gender: 'Male' | 'Female' | 'Mixed';
  teamCount?: number;
};

export const useCategoryCardViewModel = ({
  format,
  gender,
  teamCount,
}: CategoryCardViewModelProps) => {
  const iconColor =
    gender === 'Male'
      ? colors.usersIconBackground
      : gender === 'Mixed'
      ? colors.primary
      : colors.mixedBackground;
  const Icon = format === 'Doubles' ? Users : User;

  const showTeams = format === 'Doubles' && teamCount !== undefined;

  return {
    iconColor,
    Icon,
    showTeams,
  };
};
